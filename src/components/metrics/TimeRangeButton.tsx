interface Props {
  tab: number;
  setTab: (value: React.SetStateAction<number>) => void;
  changeTab: number;
}

const TimeRangeButton = ({ tab, setTab, changeTab }: Props) => {
  return (
    <button
      onClick={() => {
        setTab(changeTab);
      }}
      className={`text-xs bg-gray-100 px-2 py-1 ${
        tab === changeTab &&
        "bg-gradient-to-r from-cyan-500 to-blue-500 text-white transition duration-300"
      }`}
    >
      {changeTab.toString() + "D"}
    </button>
  );
};

export default TimeRangeButton;
