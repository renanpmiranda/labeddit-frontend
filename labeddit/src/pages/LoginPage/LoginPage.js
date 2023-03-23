import {
  Flex,  
  FormControl,  
  Input,
  Stack,
  Button,  
  Text,
  useColorModeValue,
  Spinner,
  Img,
  Divider
} from '@chakra-ui/react';

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constants/url'
import { GlobalContext } from '../../contexts/GlobalContext';
import { goToFeedPage, goToSignUpPage } from '../../routes/coordinator';
import LogoLabeddit from "../../assets/LogoLabeddit.png";

const LoginPage = () => {  

  const context = useContext(GlobalContext)

  const navigate = useNavigate()

  useEffect(() => {
    if(context.isAuth){
      goToFeedPage(navigate)
    }
  })

  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const onChangeForm = (e) => {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
  }

  const login = async () => {
    try {

      setIsLoading(true)

      const body = {
        email: form.email,
        password: form.password
      }

      const response = await axios.post(`
          ${BASE_URL}/users/login`,
        body
      )

      window.localStorage.setItem("labeddit-token", response.data.token)

      setIsLoading(false)
      context.setIsAuth(true)
      goToFeedPage(navigate)

    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Img src={LogoLabeddit} alt={"LabEddit"}></Img>
            <Text fontSize={'lg'} color={'gray.600'} pb={'45px'}>
              O projeto de rede social da Labenu
            </Text>
          </Stack>          
            <Stack spacing={4}>
              <FormControl id="email">                
                <Input
                  type="email"
                  placeholder="E-mail"
                  value={form.email}
                  onChange={onChangeForm}
                  name="email"
                  autoComplete='off'
                />
              </FormControl>
              <FormControl id="password" pb={"30px"}>                
                <Input
                  type="password"
                  placeholder="Senha"
                  value={form.password}
                  onChange={onChangeForm}
                  name="password"
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bgGradient={'linear(to-r, #FF6489, #F9B24E)'}                  
                  color={'white'}  
                  border={'1px'}
                  borderRadius={'full'} 
                  _hover={{
                    bgGradient: 'linear(to-r, #FD7E75, #FB9862)'                   
                  }}                                 
                  onClick={login}
                >
                  {isLoading ? <Spinner /> : "Continuar"}
                </Button>
              </Stack>
              <Divider colorScheme={'orange'}/>
              <Stack spacing={10}>
                <Button 
                  bgColor={'white'}
                  border={'1px'}
                  borderColor={'#FE7E02'}  
                  borderRadius={'full'}               
                  color={'#FE7E02'}                  
                  onClick={() => goToSignUpPage(navigate)}
                >
                  {isLoading ? <Spinner /> : "Crie uma conta!"}
                </Button>
              </Stack>              
            </Stack>          
        </Stack>
      </Flex>
    </>
  );
}

export default LoginPage;