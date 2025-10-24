const StudentLogin = () => {
//TODO kell userauth meg normalis UI
  return (
    <div className="mx-auto flex max-w-sm lg:items-center gap-x-4 outline-2 rounded-xl outline-slate-500 flex-col">
        <h1>Name</h1>
        <input type="text" className="rounded outline-3 outline-slate-700"/>
        <h1>Password</h1>
        <input type="text" className="rounded outline-3 outline-slate-700"/>
        <button>Enter</button>
    </div>
  )
}

export default StudentLogin