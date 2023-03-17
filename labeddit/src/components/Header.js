import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { GlobalContext } from "../contexts/GlobalContext";
import { goToLoginPage } from "../routes/coordinator";
import { Flex, Img, Link } from '@chakra-ui/react';
import LabeLogo from "../assets/LabeLogo.svg";

const Header = () => {
    const context = useContext(GlobalContext)

    const navigate = useNavigate()

    const logout = () => {
        window.localStorage.removeItem("labeddit-token")
        context.setIsAuth(false)
        goToLoginPage(navigate)
    }

    return(
        <Flex h="3.125rem" w='auto' bg="#EDEDED" justifyContent="end" alignItems="center">
            <Img src={LabeLogo} alt={"LabeLogo"} position={'absolute'}  left={'48%'}></Img>
            {context.isAuth === true ? <Link color={"#4088CB"} onClick={logout} fontWeight={'600'} fontSize={'18px'} mr={'2rem'}>Logout</Link> : <Link color={"#4088CB"} onClick={() => goToLoginPage(navigate)} fontWeight={'600'} fontSize={'18px'} mr={'2rem'}>Entrar</Link>}
        </Flex>
    )
}

export default Header;