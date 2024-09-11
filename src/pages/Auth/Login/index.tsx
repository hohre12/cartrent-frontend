import styled from "styled-components"
// import { SvgIcon } from "../../../components/svgIcon/SvgIcon"

const Login = () => {
    return <Wrapper>
        <LoginWrapper>
            <InputWrapper>
                {/* <SvgIcon /> */}
                <h1>카트렌트카 로그인</h1>
            
            </InputWrapper>
            <ImageWrapper></ImageWrapper>
        </LoginWrapper>
    </Wrapper>
}

export default Login

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
`

export const LoginWrapper = styled.div`
    
`

export const InputWrapper = styled.div``
export const ImageWrapper = styled.div``