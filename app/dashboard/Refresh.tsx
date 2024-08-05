"use client"
export default function Refresh() {
  const refreshPlaces = async () => {
    const refreshedPlaces = await api.request(
      readItems("places", {
        sort: "name",
      })
    )
    console.log("refreshedPlaces", refreshedPlaces)
  }
  return (
    <div>
      <h1>Refresh</h1>
    </div>
  )
}
