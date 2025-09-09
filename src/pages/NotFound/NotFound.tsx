
import AddButton from "../../components/AddButton/AddButton"
import Card from "../../components/Card/Card"
import SearchBar from "../../components/SearchBar/SearchBar"
import TabSwitch from "../../components/TabSwitch/TabSwitch"

function NotFound() {
  return (
    <div className="h-full w-full flex flex-col items-center  justify-start p-4 gap-4">
      <SearchBar/>
      <TabSwitch/>
      <AddButton/>
      <Card/>
        {/* <h1>404 Page not found</h1> */}
    </div>
  )
}

export default NotFound