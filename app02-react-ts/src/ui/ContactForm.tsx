import { Navigate, useParams, useLocation } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { add, update, getById } from '../services/ContactService'
import Contact from "../models/Contact";
 
const ContactForm: FC<{}> = () => {
 
    let [isSaved, setSaved] = useState<boolean>(false);
    let [isEditing, setEditing] = useState<boolean>(false);
    let [errMsg, setErrMsg] = useState<string | null>(null);
 
    let { id } = useParams();
 
    let { pathname } = useLocation();
 
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Contact>({
        defaultValues: { id: 0, name: '', mobile: '', mailId: '' }
    });
 
    useEffect(() => {
        if (id && pathname===`/edit/${id}`) {
            setEditing(true);
            getById(Number(id))
                .then(resp => reset(resp.data))
                .catch(err => {
                    console.error(err);
                    setErrMsg("Unable to load existing record! Please retry later!");
                })
        }else{
            setEditing(false);
            reset({ id: 0, name: '', mobile: '', mailId: '' });
        }
    }, [id,pathname]);
 
    const save: SubmitHandler<Contact> = (contact) => {
        let p: Promise<Contact> = isEditing ? update(contact) : add(contact);
        p.then(_contact => setSaved(true))
            .catch(err => {
                console.error(err);
                setErrMsg("Unable to save data! Please retry later!");
            })
    };
 
    return isSaved ? <Navigate to='/' /> : (
            <section className="col-5 mx-auto p-4">
                <h4>
                    <i className={isEditing ? "bi-pen-fill" : "bi-file-earmark-plus-fill"} />
                    {isEditing ? "Edit" : "New"} Contact Details
                </h4>
 
                {
                    errMsg && (
                        <div className="alert alert-danger p-4 fw-bold text-center">
                            {errMsg}
                        </div>
                    )
                }
 
                <form onSubmit={handleSubmit(save)}>
                    <div className="form-group">
                        <label className="form-label">Contact Id</label>
                        <input type="number" className="form-control" {...register("id")} readOnly={true} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" {...register("name", { required: true })} />
                        {errors.name?.type === 'required' && <span>This field is required</span>}
                    </div>
                    <div className="form-group">
                        <label className="form-label">Mobile</label>
                        <input type="text" className="form-control" {...register("mobile", { required: true, pattern: /[1-9][0-9]{9}/ })} />
                        {errors.mobile?.type === 'required' && <span>This field is required</span>}
                        {errors.mobile?.type === 'pattern' && <span>A 10 digit number expected</span>}
                    </div>
                    <div className="form-group">
                        <label className="form-label">Mail Id</label>
                        <input type="email" className="form-control" {...register("mailId", { required: true })} />
                        {errors.mailId?.type === 'required' && <span>This field is required</span>}
                    </div>
                    <div className="d-grid mt-1">
                        <button className="btn btn-primary">
                            <i className="bi-floppy" /> SAVE
                        </button>
                    </div>
                </form>
            </section>
        );
};
 
export default ContactForm;