import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email");
  const name = data.get("name");

  console.log(email, name);

  return new Response(JSON.stringify({ email, name }), {
    headers: { "Content-Type": "application/json" },
  });
};
