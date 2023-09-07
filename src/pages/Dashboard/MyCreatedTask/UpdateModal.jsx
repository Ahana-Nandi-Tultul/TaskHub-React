import moment from "moment";

const UpdateModal = ({isOpen, setIsOpen, oneTask, handleUpdateTask}) => {
    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'} `}>
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg md:w-1/2 w-5/6">
                <h2 className='text-lg text-center font-semibold'>Update {''}</h2>
                <div className="flex justify-end">
                    <button className="btn btn-square btn-outline" onClick={() => setIsOpen(!isOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            <form onSubmit={() => handleUpdateTask(event, oneTask.title)}>
            <div className="form-control">
                        <label className="label">
                            <span className="label-text">Assign To</span>
                        </label>
                        <label className="input-group">
                            <span>Assign To</span>
                            <input type="text" name='assignTo' defaultValue={oneTask?.assignTo}
                             className="input input-bordered w-full"  required/>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Date</span>
                        </label>
                        <label className="input-group">
                            <span>Date</span>
                            <input type="date" name='date' defaultValue={oneTask?.date}
                            min={moment().format("YYYY-MM-DD")}
                            className="input input-bordered w-full"  required/>
                        </label>
                </div>
                <div className="form-control mb-8">
                        <label className="label">
                            <span className="label-text">Task Description</span>
                        </label>
                        <textarea  name="des"
                        defaultValue={oneTask?.des}
                        className="textarea textarea-bordered textarea-lg w-full" ></textarea>
                </div>
                <div className='flex justify-between items-center'>
                    <input type='submit' className='btn bg-green-700 text-white' value="Update"/>
                </div>
            </form>
           
            </div>
        </div>
    </div>
    );
};

export default UpdateModal;