import { redirect } from "next/navigation";

interface PeopleRedirectProps {
  params: {
    cid: string;
  };
}

export default function PeopleRedirect({ params }: PeopleRedirectProps) {
  redirect(`/Courses/${params.cid}/People/Table`);
}
