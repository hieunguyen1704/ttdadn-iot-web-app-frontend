import { logout } from '../action/auth'
import { useDispatch } from 'react-redux'

const dispatch = useDispatch()
export default function signout() {
    dispatch(logout())
}