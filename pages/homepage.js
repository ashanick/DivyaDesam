import WelcomeBanner from '../components/homepage/welcome'
import NewSearch from '../components/users/new-search'
import HomePageComponent from '../components/homepage'

function HomePageMain() {
    return (
        <div>
            <WelcomeBanner />
            <NewSearch type = "common"/>
            <HomePageComponent />
        </div>
    )
}

export default HomePageMain