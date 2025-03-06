import {BrowserRouter, Route, Routes} from "react-router";
import {RootRoute} from "../../routes/root/index.tsx";

export const AppRouter = () => {
    return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element= (<RootRouter />) />
    < Route path ="/dettaglio/:id" element={<DetailRoute />} />
    <Routes>
    </BrowserRouter>
    )
}