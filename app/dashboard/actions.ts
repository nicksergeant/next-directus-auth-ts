'use server';

import { auth } from "@/auth";
import { directus } from "@/services/directus"
import { readItems } from "@directus/sdk"

export async function refreshPlaces(_prevState: any, formData: FormData) {
  const session = await auth()

  console.log("refreshPlaces SESSION", session)

  const token = session?.access_token
  const api = directus(token)

  const places = await api.request(
    readItems("places", {
      sort: "name",
    })
  )

  console.log(places)

  return {
    places,
  }
}
