import { FC, useEffect, useState } from "react";
import { deleteById, getAll } from "../services/ContactService.tsx"
import Contact from "../models/Contact";
import { Link } from "react-router-dom";
const ContactList: FC<any> = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errMsg, setErrMsg] = useState<string | null>(null);

    useEffect(() => {
        const getContactList = async () => {
            await getAll().then(res => {
                setContacts(res.data)
                setIsLoading(false);

            }).catch(err => {
                console.log(err);
                setErrMsg("someting went wrong");
            })
        };
        getContactList();
    }, [])

    const deleteContact = async (id: number) => {
        if (window.confirm("are u sure want to delete")) {
            await deleteById(id).then((res) => {
                setContacts(contacts.filter(c => c.id !== id))
            }).catch(err => {
                setErrMsg("Unable to delete data! please try again later")
            })
        }

    }

    return (
        <section>
            {isLoading && (
                <div className="alert alert-info p-4 fw-bold text-center">
                    Please wait
                </div>
            )}
            {errMsg && (
                <div className="alert p-4 fw-bold text-center">
                    <p>{errMsg}</p>
                </div>
            )}
            {!isLoading && contacts.length == 0 && (
                <div className="alert alert-info p-4 fw-bold text-center">
                    <p>No records to display</p>
                </div>
            )}
            {!isLoading && contacts.length > 0 && (
                <table className="table table-striped table hovered">
                    <tr>
                        <th>Contact#</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>MailId</th>
                        <th>Actions</th>
                    </tr>
                    {contacts?.map((c) => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.mobile}</td>
                            <td>{c.emailId}</td>
                            <td>
                                <Link to={"/edit/" + c.id} className="btn btn-sm btn-secondary me-1">
                                    <i className="bi-pen-fill"></i>Edit
                                </Link>
                                <button type="button" className="btn btn-sm btn-danger" onClick={() => deleteContact(c.id)}>
                                    <i className="bi-trash-fill"></i>Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                </table>
            )}
        </section>
    )

}
export default ContactList;