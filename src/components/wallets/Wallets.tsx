import WalletsList from "@/components/wallets/WalletsList.tsx";

const Wallets = () => {
  return (
    <section className="text-white w-full p-4 mt-[10px] ml-[20px]">
      <h1 className="text-[25px]">Wallets</h1>
      <ul className="mt-[30px]">
        <WalletsList />
      </ul>
    </section>
  );
};

export default Wallets;
