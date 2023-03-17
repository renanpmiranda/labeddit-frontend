import {
  Flex,
  Box,
  FormControl,  
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Spinner,
  Checkbox
} from '@chakra-ui/react';

import { useContext, useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { goToFeedPage, goToLoginPage } from '../../routes/coordinator';
import axios from 'axios';
import { BASE_URL } from '../../constants/url';
import { GlobalContext } from '../../contexts/GlobalContext';
import Header from '../../components/Header';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()

  const context = useContext(GlobalContext)

  useEffect(() => {
    if(context.isAuth){
      goToFeedPage(navigate)
    }
  })

  const [ isLoading, setIsLoading ] = useState(false)

  const [ form, setForm ] = useState({
    nome: "",    
    email:"",
    senha:""
  })

  const onChangeForm = (e) => {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
  }

  const signUp = async () => {
    try{

      setIsLoading(true)

      const body = {
        name: form.nome,
        email: form.email,
        password: form.senha
      }

      const response = await axios.post(`
        ${BASE_URL}/users/signup`,
        body
      )

      console.log(response)
      window.localStorage.setItem("labeddit-token", response.data.token)

      context.setIsAuth(true)
      goToFeedPage(navigate)
      setIsLoading(false)

    } catch(error){
      console.log(error)
      setIsLoading(false)
      
    }
  }

  return (
    <>
    <Header/>
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack mx={'0'} maxW={'md'} py={3} px={5}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'justified'} color={'#373737'} mx={'20px'} pb={'10rem'}>
            Olá, boas vindas ao LabEddit ;)
          </Heading>          
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4} pb={'5rem'}>
            <HStack>              
                <FormControl id="firstName" isRequired>                  
                  <Input type="text" name="nome" autoComplete="off" value={form.nome} onChange={onChangeForm} placeholder={'Nome'}/>
                </FormControl>             
            </HStack>
            <FormControl id="email" isRequired>              
              <Input type="email" name="email" autoComplete="off" value={form.email} onChange={onChangeForm} placeholder={'E-mail'}/>
            </FormControl>
            <FormControl id="password" isRequired>              
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} name="senha" value={form.senha} onChange={onChangeForm} placeholder={'Senha'}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={5} pt={2}>
              <Text fontSize={'14px'}>Ao continuar, você concorda com o nosso <Link color={'#4088CB'}>Contrato de usuário</Link> e nossa <Link color={'#4088CB'}>Política de Privacidade</Link>.</Text>
              <Checkbox size={'sm'}>Eu concordo em receber e-mails sobre coisas legais do LabEddit</Checkbox>
              <Button
                loadingText="Submitting"
                size="lg"
                bgGradient={'linear(to-r, #FF6489, #F9B24E)'}                  
                color={'white'}  
                border={'1px'}
                borderRadius={'full'}
                _hover={{
                  bgGradient: 'linear(to-r, #FD7E75, #FB9862)'                   
                }}
                onClick={signUp}                
                >
                {isLoading ? <Spinner /> : "Cadastrar"}
              </Button>
            </Stack>            
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </>
  );
}

export default SignUpPage