import {
  authentication,
  createDirectus,
  rest,
  staticToken,
} from "@directus/sdk"

export const directus = (token: string = "") => {
  if (token) {
    return createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_API ?? "")
      .with(staticToken(token))
      .with(rest())
  }
  console.log('[USING COOKIE] directus()')
  return createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_API ?? "")
    .with(
      authentication("cookie", { credentials: "include", autoRefresh: true })
    )
    .with(rest({ credentials: "include" }))
}

export const login = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_API}/auth/login`,
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    }
  )
  const user = await res.json()
  if (!res.ok && user) {
    throw new Error("Email address or password is invalid")
  }
  if (res.ok && user) {
    return user?.data
  }
}
