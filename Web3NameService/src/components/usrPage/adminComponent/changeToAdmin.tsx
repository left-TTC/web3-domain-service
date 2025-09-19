
import "@/style/components/usrPage/adminComponents/changeToAdmin.css"
import admin from "@/assets/admin.svg"

export interface ChangeToAdminProps {
    ifAdminModel: boolean,
    // false => no
    changeAdminModel: React.Dispatch<React.SetStateAction<boolean>>,
}

const ChangeToAdmin: React.FC<ChangeToAdminProps> = ({
    ifAdminModel, changeAdminModel
}) => {

    const changeModel = () => {
        changeAdminModel(!ifAdminModel)
    }

    return(
        <button 
            className={`changeadmin ${ifAdminModel? 'adminmodelactive':''}`} 
            onClick={() => changeModel()}
        >
            <img src={admin} className="admin" />
        </button>
    )
}

export default ChangeToAdmin;
