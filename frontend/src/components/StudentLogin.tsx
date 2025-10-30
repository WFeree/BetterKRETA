import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const StudentLogin = () => {
//TODO kell userauth meg normalis UI
  return (
    <div className="my-auto mx-auto flex flex-col p-2 max-w-sm gap-x-4 outline-2 rounded-xl outline-black-500 ">
        <Label className="py-2">Username</Label>
        <Input type="text" className=""/>
        <Label className="py-2">Password</Label>
        <Input type="text" className=""/>
        <Button className="mt-2 hover:cursor-pointer">Login</Button>
    </div>
  )
}

export default StudentLogin