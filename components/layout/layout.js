import FooterSection from './footer'
import './main-header'
import MainHeader from './main-header'

function Layout(props) {
    return (
        <div>
            <MainHeader />
            <main >{props.children}</main>
            <hr style={{border: '1px solid red'}}/>
            <FooterSection />
        </div>
    )
}

export default Layout