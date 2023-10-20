import useSWR from 'swr'

function createURL(path: string) {
  return window.location.origin + path
}

// @ts-ignore
export const fetcher = (...args) =>
  // @ts-ignore
  fetch(...args).then((res) => {
    return res
      .json()
      .then((data) => data.data)
      .catch((err) => {
        throw err
      })
  })
async function fetchData(url: string) {
  const { data, error } = await useSWR(url, fetcher)

  if (error) throw error

  return data
}

export function getJobList() {
  return fetchData('/api/worker')
}
