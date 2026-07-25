import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL!;

if (!endpoint) {
  throw new Error(
    "NEXT_PUBLIC_WORDPRESS_API_URL is not defined. Check your .env.local file."
  );
}

export const gqlClient = new GraphQLClient(endpoint, {
  headers: {
    "Content-Type": "application/json",
  },
  // WPGraphQL sometimes needs this for introspection
  fetch: (url, init) =>
    fetch(url, {
      ...init,
      // Next.js cache config: revalidate every 60s
      next: { revalidate: 60 },
    } as RequestInit),
});

/** Generic typed query executor */
export async function gqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  try {
    return await gqlClient.request<T>(query, variables);
  } catch (err) {
    console.error("[GraphQL Error]", err);
    throw err;
  }
}
