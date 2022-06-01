import {Menu,Container,Button} from 'semantic-ui-react'
import Link from 'next/link';
import { useRouter } from 'next/router';


 const  Navbar = ()=>{
    const router = useRouter();
     return (
        <Menu inverted borderless style={{padding:".3rem", marginBottom:"22px"}} attached>
             <Container>
                 <Menu.Item name='home'>
                    <Link href="/">
                      <img src='https://flow-e.com/wp-content/uploads/bfi_thumb/Google-task-list-379tmv50jkyo35v5zqpoui.png' style={{width:'100px', height:'100px', objectFit:'cover', borderRadius:'50%'}} />   
                    </Link>        
                 </Menu.Item>

                 <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button size='mini' primary onClick={()=>router.push('/tasks/new')}>New Task</Button>
                    </Menu.Item>
                 </Menu.Menu>
             </Container>
        </Menu>
     )
}

export default Navbar;