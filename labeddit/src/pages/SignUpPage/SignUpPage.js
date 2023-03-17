import {
  Flex,
  Box,
  FormControl,
  FormLabel,
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
  Spinner
} from '@chakra-ui/react';

import { useContext, useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { goToFeedPage, goToLoginPage } from '../../routes/coordinator';
import axios from 'axios';
import { BASE_URL } from '../../constants/url';
import { GlobalContext } from '../../contexts/GlobalContext';

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
    sobrenome:"",
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
        ${BASE_URL}/user/signup`,
        body
      )

      console.log(response)
      window.localStorage.setItem("cookenu-token", response.data.token)

      context.setIsAuth(true)
      goToFeedPage(navigate)
      setIsLoading(false)

    } catch(error){
      console.log(error)
      setIsLoading(false)
      
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Cadastre-se
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            para aproveitar as melhores receitas ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Nome</FormLabel>
                  <Input type="text" name="nome" autoComplete="off" value={form.nome} onChange={onChangeForm}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Sobrenome</FormLabel>
                  <Input type="text" name="sobrenome" autoComplete="off" value={form.sobrenome} onChange={onChangeForm}/>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Endereço de E-mail</FormLabel>
              <Input type="email" name="email" autoComplete="off" value={form.email} onChange={onChangeForm}/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} name="senha" value={form.senha} onChange={onChangeForm}/>
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
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={signUp}
                >
                {isLoading ? <Spinner /> : "Cadastrar"}
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Já possui cadastro? <Link color={'blue.400'} onClick={() => goToLoginPage(navigate)}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SignUpPage