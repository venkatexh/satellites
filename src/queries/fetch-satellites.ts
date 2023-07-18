import satellitesData from '../satellites.json'
import type { Satellite } from '@/types/satellite'

export const fetchSatellites = (
  searchString = '',
  countryCode = '',
  orbitCode = '',
  objectType = '',
  page: number
) =>
  new Promise<Satellite[]>((resolve) => {
    const filteredData = (satellitesData as Satellite[]).filter(
      (satellite: Satellite) =>
        satellite?.countryCode?.includes(countryCode) &&
        satellite?.orbitCode?.includes(orbitCode) &&
        satellite?.objectType?.includes(objectType)
    )
    const searchedData = filteredData.filter(
      (satellite: Satellite) =>
        satellite?.name?.toLowerCase().includes(searchString.toLowerCase()) ||
        satellite?.noradCatId?.toLowerCase().includes(searchString.toLowerCase())
    )
    if (page === 1) {
      return setTimeout(() => resolve(searchedData.slice(0, 10)), 1000)
    } else {
      return setTimeout(() => resolve(searchedData.slice(page * 10, (page + 1) * 10)), 1000)
    }
  })
