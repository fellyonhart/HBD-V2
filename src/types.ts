export type DeviceTier = 'low' | 'mid' | 'high'

export type Photo = {
  id: string
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

export type Message = {
  id: string
  name: string
  relation: string
  message: string
}

export type Letter = {
  title: string
  paragraphs: string[]
  signature: string
}
