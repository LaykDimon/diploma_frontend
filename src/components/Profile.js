import { getUserSessionData } from '../extra/utils';
import moment from 'moment';
import 'moment/locale/uk';

export function Profile() {

    return (
        <>
            <div className='userData'>Ім'я користувача: {getUserSessionData()?.user.username}</div>
            <div className='userData'>Поштовий адрес: {getUserSessionData()?.user.email}</div>
            <div className='userData'>Створено: {moment(getUserSessionData()?.user.created_at).locale('uk').format("dddd, MMMM Do YYYY, hh:mm:ss")}</div>
        </>
    );
}