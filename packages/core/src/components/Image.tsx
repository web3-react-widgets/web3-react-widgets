import styled from 'styled-components/macro'

type ImageProps = {
  width?: string
  height?: string
  radius?: string
  src: string
}

const StyledImage = styled.img<ImageProps>`
  border-radius: ${(props) => props.radius || '0px'};
  height: ${(props) => props.height || '2rem'};
  width: ${(props) => props.width || '2rem'};
`

export function Image(props: ImageProps) {
  return <StyledImage {...props}></StyledImage>
}
