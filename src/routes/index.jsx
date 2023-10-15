import {BrowserRouter} from 'react-router-dom'
import AppRoutes from './AppRoute/app.routes'

export default function Routes(){

    return(
        <BrowserRouter>
        <AppRoutes/>
        </BrowserRouter>
    )
}