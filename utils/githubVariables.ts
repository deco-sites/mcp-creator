export class GitHubVariables {
  private static instance: GitHubVariables;
  private token?: string;

  private constructor() {
    this.token = Deno.env.get("GITHUB_TOKEN") ?? undefined;
  }

  public static getInstance(): GitHubVariables {
    if (!GitHubVariables.instance) {
      GitHubVariables.instance = new GitHubVariables();
    }
    return GitHubVariables.instance;
  }

  public setToken(newToken: string) {
    if (!this.token) {
      this.token = newToken;
    }
  }

  public getToken(): string {
    if (!this.token) {
      this.token = Deno.env.get("GITHUB_TOKEN") ?? "";
    }
    return this.token;
  }

  public generateBranchFeature(): string {
    return crypto.randomUUID();
  }
}
