import {
    Textarea,
    Stack,
    Flex,    
    useColorModeValue,
    Button,
    Spinner,
    Divider
} from "@chakra-ui/react";

import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import { BASE_URL } from "../../constants/url"
import { GlobalContext } from "../../contexts/GlobalContext"
import { goToLoginPage } from "../../routes/coordinator"
import PostCard from "./PostCard";

const FeedPage = () => {

    const context = useContext(GlobalContext)

    const navigate = useNavigate()

    const [ posts, setPosts ] = useState()

    const [ isLoading, setIsLoading ] = useState(false)

    const [ postInput, setPostInput ] = useState({
        content: ""
    })

    const onChangePostInput = (e) => {
        setPostInput({
            ...postInput, [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if(!context.isAuth){
            goToLoginPage(navigate)
        }
    }, [])

    useEffect(() => {
        fetchPosts()
    }, [])

    useEffect(() => {
        newPost()
    }, [])

    const fetchPosts = async () => {
        try {

            setIsLoading(true)

            const config = {
                headers: {
                    Authorization: window.localStorage.getItem("labeddit-token")
                }
            }
            const response = await axios.get(`${BASE_URL}/posts/`, config)
                       
            setIsLoading(false)           
            setPosts(response.data)

        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const newPost = async() => {
        try {
            const body = {
                content: postInput
            }

            const config = {
                headers: {
                    Authorization: window.localStorage.getItem("labeddit-token")
                }
            }

            await axios.post(`${BASE_URL}/posts`, config, body)

        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    return (
        <>
        <Header/>
        <Flex
          minH={'100vh'} 
          bg={useColorModeValue('gray.50', 'gray.800')}
          justify={'center'}>
          <Stack mx={'0'} maxW={'md'} py={5} px={5}>
            <Stack align={'center'}>
                <Textarea
                placeholder={"Escreva seu post..."}
                bgColor={"#EDEDED"}
                w={"350px"}
                h={"131px"}          
                value={postInput.content} 
                onChange={onChangePostInput}    
                name={"content"}                          
                >
                </Textarea>                
            </Stack>  
            <Stack spacing={5} pt={2}>
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
                    onClick={() => newPost}                              
                    >
                    {isLoading ? <Spinner /> : "Postar"}
                </Button>
            </Stack> 
            <Stack spacing={5} pt={3}>
                <Divider colorScheme={'orange'}/>  
            </Stack> 
            <Stack spacing={5} pt={3}>
            <Flex flexWrap={"wrap"}>
                {posts?.map((post) => {
                    return (
                        <PostCard key={post.id} post={post}/>
                    )
                })}
            </Flex>
            </Stack>      
          </Stack>
        </Flex>
        </>
    )
}

export default FeedPage;