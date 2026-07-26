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
  fetch: (url, init) => {
    // Only pass Next.js specific cache options when running on the server
    const isServer = typeof window === 'undefined';
    const fetchOptions: any = { ...init };
    if (isServer) {
      fetchOptions.next = { revalidate: 60 };
    }
    return fetch(url, fetchOptions as RequestInit);
  }
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
