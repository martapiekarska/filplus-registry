interface Props {
  bgColor: string;
}

const Square = ({ bgColor }: Props) => {
  return <span className={`${bgColor} h-2 w-2 inline-block mr-1`}></span>;
};

export default Square;
