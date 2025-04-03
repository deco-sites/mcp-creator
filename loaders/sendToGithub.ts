import { AppContext } from "site/apps/site.ts";
import {
  BRANCH_BASE,
  COMMIT_MESSAGE,
  OWNER,
  PR_BODY,
  REPO,
} from "site/constants.ts";

const token = Deno.env.get("GITHUB_TOKEN");
const headers: RequestInit["headers"] = {
  Authorization: `token ${token}`,
};
const prTitle = (name: string, branchFeature: string) =>
  `New MCP server for ${name} in ${branchFeature}`;

export interface Blob {
  path: string;
  sha: string;
}

export interface FileWithUrl {
  name: string;
  /**
   * @description this is the file link (openapi.json)
   */
  urlFile: string;
}

export interface FileWithContent {
  name: string;
  /**
   * @description this is the json in string (openapi.json)
   */
  content: string;
}

export interface Props {
  pathName: string;
  files: Array<FileWithUrl | FileWithContent>;
}

async function getBaseSha() {
  const latestCommit = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/commits/${BRANCH_BASE}`,
    {
      headers,
    },
  ).then((r) => r.json());
  return latestCommit.sha as string;
}

async function createBranch(branchFeature: string) {
  try {
    const shaBase = await getBaseSha();

    const options: RequestInit = {
      body: JSON.stringify({
        ref: `refs/heads/${branchFeature}`,
        sha: shaBase,
      }),
      method: "POST",
      headers,
    };

    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/git/refs`,
      options,
    ).then((r) => r.json());
    console.log("Branch criado com sucesso:", response);
  } catch (error) {
    console.error("Erro ao criar branch:", error);
  }
}

async function createBlobs({ files, pathName }: Props) {
  return await Promise.all(
    files.map(async ({ name, ...props }) => {
      try {
        const file = "urlFile" in props
          ? await fetch(props.urlFile).then((r) => r.json())
          : JSON.parse(props.content);
        const content = JSON.stringify(file, null, 2);

        const options: RequestInit = {
          body: JSON.stringify({
            content,
            encoding: "utf-8",
          }),
          headers,
          method: "POST",
        };

        const response = await fetch(
          `https://api.github.com/repos/${OWNER}/${REPO}/git/blobs`,
          options,
        ).then((r) => r.json());
        return {
          path: `docs/${pathName}/${name}.openapi.json`,
          sha: response.sha,
        };
      } catch (error) {
        console.error(`❌ Erro ao buscar ${props}:`, error);
        return null;
      }
    }),
  ).then((results) => results.filter((blob) => blob !== null));
}

async function createTree(baseTreeSha: string, blobs: Blob[]) {
  try {
    const options: RequestInit = {
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree: blobs.map(({ path, sha }) => ({
          path,
          mode: "100644",
          type: "blob",
          sha,
        })),
      }),
      method: "POST",
      headers,
    };
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/git/trees`,
      options,
    ).then((r) => r.json());
    console.log({ response });
    return response.sha;
  } catch (error) {
    console.log(`❌ Erro ao criar o tree`, error);
  }
}

async function createCommit(treeSha: string, parentSha: string) {
  try {
    const options: RequestInit = {
      body: JSON.stringify({
        message: COMMIT_MESSAGE,
        tree: treeSha,
        parents: [parentSha],
      }),
      headers,
      method: "POST",
    };
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/git/commits`,
      options,
    ).then((r) => r.json());
    console.log({ response });
    return response.sha;
  } catch (error) {
    console.log(`❌ Erro ao criar o commit`, error);
  }
}

async function updateBranch(commitSha: string, branchFeature: string) {
  try {
    const options: RequestInit = {
      body: JSON.stringify({ sha: commitSha }),
      headers,
      method: "PATCH",
    };
    await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/git/refs/heads/${branchFeature}`,
      options,
    );
  } catch (error) {
    console.log(`❌ Erro ao atualizar a branch`, error);
  }
}

async function createPullRequest(name: string, branchFeature: string) {
  try {
    const options: RequestInit = {
      body: JSON.stringify({
        title: prTitle(name, branchFeature),
        head: branchFeature,
        base: BRANCH_BASE,
        body: PR_BODY,
      }),
      headers,
      method: "POST",
    };
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/pulls`,
      options,
    ).then((r) => r.json());
    const prUrl = response.html_url;
    console.log(
      `✅ PR criado com sucesso: ${prUrl}`,
    );
    return prUrl;
  } catch (error) {
    console.log(`❌ Erro ao criar o PR`, error);
  }
}

export const cache = "no-cache";
export default async function loader(
  props: Props,
  _req: Request,
  _ctx: AppContext,
) {
  const BRANCH_FEATURE = crypto.randomUUID();
  await createBranch(BRANCH_FEATURE);
  const blobs = await createBlobs(props);
  const baseTreeSha = await getBaseSha();
  const treeSha = await createTree(baseTreeSha, blobs);
  const commitSha = await createCommit(treeSha, baseTreeSha);
  await updateBranch(commitSha, BRANCH_FEATURE);
  return await createPullRequest(props.pathName, BRANCH_FEATURE);
}
