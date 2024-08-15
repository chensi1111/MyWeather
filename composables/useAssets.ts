export default function () {
  const images = computed<Record<string, string>>(() =>
    import.meta.glob('~/assets/images/**/*', { eager: true, import: 'default' })
  )
  const getImageUrl = (type: string, filename: string | undefined) => {
    const url = `/assets/images/${type}/${String(filename).replace(/^(\.\/+|\/+)/, '')}`
    return images.value?.[url]
  }

  return {
    getImageUrl
  }
}
