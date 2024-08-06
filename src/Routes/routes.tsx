import { dashboard } from "../pages/dashboard"

interface Iroutes{
  path:string,
  component:React.Component|React.FunctionComponent

}
export const routes:Iroutes[]=[{
  path:"/",
  component:dashboard
}]