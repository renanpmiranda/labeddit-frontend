import {    
    Card,    
    Text,           
    Flex,
    Stack
} from "@chakra-ui/react"

import { ArrowDownIcon, ArrowUpIcon, ChatIcon } from "@chakra-ui/icons"

const PostCard = (props) => {
    const { post } = props    

    return (
        <>
        <Card w={'350px'}>            
        <Text fontSize='xs' paddingLeft={'10px'} paddingTop={'5px'}>Enviado por: {post.creatorName}</Text>           
        <Text fontSize={'lg'} paddingLeft={'10px'} paddingTop={'5px'}>{post.content}</Text>
            <Flex>
            <Stack border={'1px'} borderColor={'#E0E0E0'} borderRadius={'12px'} m={'10px'}>
                <Flex paddingTop={'5px'} justifyContent={'space-around'} align={'center'}>
                    <ArrowUpIcon/>
                    {post.likes}
                    <ArrowDownIcon/>
                </Flex>                
            </Stack>
            <Stack border={'1px'} borderColor={'#E0E0E0'} borderRadius={'10px'} m={'10px'}>
                <Flex paddingTop={'5px'} align={'center'} m={'5px'}>
                    <ChatIcon/>
                </Flex>                
            </Stack>
            </Flex>
        </Card>
        </>
    )
}

export default PostCard;