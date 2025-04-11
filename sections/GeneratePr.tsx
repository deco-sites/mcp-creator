import { invoke } from "site/runtime.ts";
import { useState } from "preact/hooks";
import LoadingSpiner from "site/components/ui/LoadingSpiner.tsx";

function GeneratePr() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverLink, setServerLink] = useState<string>("");
  return (
    <form
      class="flex flex-col gap-4 p-4 max-w-[500px] border rounded-lg mx-auto mt-52"
      onSubmit={async (e) => {
        try {
          e.preventDefault();
          const form = e.currentTarget;
          const docName = form.elements.namedItem(
            "doc-name",
          ) as HTMLInputElement;
          const docLink = form.elements.namedItem(
            "doc-link",
          ) as HTMLInputElement;
          if (
            (docName.value && docLink.value) &&
            (docName.value.length >= 1 && docLink.value.length >= 1)
          ) {
            setIsLoading(true);
            const mcp = await invoke({
              key: "site/loaders/generateOpenapi.ts",
              props: {
                name: docName.value,
                url: docLink.value,
              },
            });
            setServerLink(mcp.prUrl);
          }
        } finally {
          setIsLoading(false);
        }
      }}
    >
      <input
        name="doc-name"
        type="text"
        required
        placeholder="Name of the doc"
        class="rounded-lg p-2 border border-[#0A2A1A] outline-none focus:outline-none"
      />
      <input
        name="doc-link"
        type="text"
        required
        placeholder="Link of the doc"
        class="rounded-lg p-2 border border-[#0A2A1A] outline-none focus:outline-none"
      />
      <button
        class="btn bg-[#2fd080] text-black"
        disabled={isLoading}
        type="submit"
      >
        {isLoading && <LoadingSpiner />}
        <p>Generate MCP server</p>
      </button>
      <p>{`Your pull request link is: ${serverLink}`}</p>
    </form>
  );
}

export default GeneratePr;
