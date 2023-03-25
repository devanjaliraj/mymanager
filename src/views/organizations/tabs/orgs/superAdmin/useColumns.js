import { Copy, Eye, Trash, UserPlus } from "react-feather";
import { Badge } from "reactstrap";
import { convertDate } from "../../../../goals/helpers/converters";



export const useColumns = ({handleDetails},{handleAddUser},{handleDelete})=>{

const handleCopyLink = (row)=>{
    navigator.clipboard.writeText(`https://mymanager.com/organizations/${row.path}/signup`);
}

const columns = [
    {
        name:"Organizations",
        selector:(row)=>row?.name,
        width:'14%',
        cell:(row) => <span style={{cursor:"pointer"}}>{row.name}</span>
    },
    {
        name:"Email",
        selector:(row)=>row?.email,
        width:'15%',
        cell:(row) => <span style={{cursor:"pointer"}}>{row.email}</span>
    },
    {
        name:"Contact",
        selector:(row)=>row?.contact,
        width:'10%',
        cell:(row) => <span style={{cursor:"pointer"}}>{row.contact}</span>
    },
    {
        name:"Address",
        selector:(row)=>row?.address,
        width:'10%',
        cell:(row) => <span style={{cursor:"pointer"}}>{row.address}</span>
    },
    {
        name:"Link",
        selector:(row)=>row?.path,
        width:'15%',
        cell:(row)=>(<div className="d-flex justify-content-between w-100"><span>/{row.path}/signup </span>{row.isDeleted?<Copy className="text-muted" />:<Copy className="text-primary" onClick={()=>handleCopyLink(row)} style={{cursor:"pointer"}}/>}</div>)
    },
    {
        name:"Status",
        selector:(row)=>row?.isVerified,
        width:"10%",
        cell:(row) =>(row?.isDeleted?<Badge color='light-secondary'>Archived</Badge>:<Badge color='light-primary'>{row?.isVerified === true?'Verified':'Not Verified'}</Badge>)
    },
    {
        name:"Last Activity",
        selector:(row)=>row?.updatedAt,
        width:'8%',
        cell:(row)=>(<span><b>{convertDate(row.updatedAt)}</b></span>)
    },
    {
        name:"Users",
        selector:(row)=>row?.totals?.users,
        width:"6%",
        cell:(row) => <span>{row?.total?.users ? row?.total?.users : '0'}</span>
        
    },

    {
        name:"Actions",
        selector:(row)=>row?._id,
        width:"12",
        cell:(row)=>(
            <div className='justify-content-between'>
                <Eye className='mx-50 text-secondary' size={18} style={{cursor:"pointer"}} onClick={()=>handleDetails(row)}/>
                {/* {row?.isDeleted?<UserPlus className='mx-50 text-muted' size={18} />:<UserPlus className='mx-50 text-primary' size={18} style={{cursor:"pointer"}} onClick={()=>handleAddUser(row)}/>} */}
                {row?.isDeleted ? <Trash className='mx-50 text-muted' size={18}  />:<Trash className='mx-50 text-danger' size={18} style={{cursor:"pointer"}} onClick={()=>handleDelete(row)}/>}
            </div>
        )
    },
]

return {
    columns
  };
}