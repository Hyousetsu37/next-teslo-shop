import Link from 'next/link';

interface Props {
  optionName: string;
  icon: JSX.Element;
}

export const SidebarOption = ({ optionName, icon }: Props) => {
  return (
    <Link
      href={'/'}
      className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
    >
      {icon}
      <span className="ml-3 text-xl"> {optionName} </span>
    </Link>
  );
};
