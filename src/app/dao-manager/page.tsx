"use client";

import DaoCard from "../components/DaoCard";
import PlatformLayout from "../layouts/platformLayout";

export default function DaoManager() {
  return (
    <PlatformLayout>
      <div className=" p-8 gap-6 flex flex-wrap content-start  ">
        <DaoCard
          name={"Arbitrum"}
          colour={"slate-800"}
          path={"/daos/arbitrum"}
          drafts={11}
          projects={10}
          disabled={false}
        />
        <DaoCard
          name={"Optimism"}
          colour={"bg-red-600"}
          path={"/daos/optimism"}
          drafts={22}
          projects={11}
          disabled={false}
        />
        <DaoCard
          name={"Web3 Dao"}
          colour={"bg-stone-300"}
          path={"/daos/web3"}
          drafts={10}
          projects={6}
          disabled={false}
        />
        {/* new ones  */}
        <DaoCard
          name={"Maker Dao"}
          colour={"bg-emerald-500"}
          path={"/daos/maker"}
          drafts={10}
          projects={6}
          disabled
        />
        <DaoCard
          name={"Nouns"}
          colour={"bg-orange-700"}
          path={"/daos/nouns"}
          drafts={10}
          projects={6}
          disabled
        />
        <DaoCard
          name={"Aave"}
          colour={"bg-pink-500"}
          path={"/daos/aave"}
          drafts={10}
          projects={6}
          disabled
        />
        <DaoCard
          name={"ENS"}
          colour={"bg-sky-600"}
          path={"/daos/ens"}
          drafts={10}
          projects={6}
          disabled
        />
        <DaoCard
          name={"Gnosis"}
          colour={"bg-green-600"}
          path={"/daos/gnosis"}
          drafts={10}
          projects={6}
          disabled
        />
        <DaoCard
          name={"Lido"}
          colour={"bg-sky-400"}
          path={"/daos/lido"}
          drafts={10}
          projects={6}
          disabled
        />
        <DaoCard
          name={"Safe"}
          colour={"bg-green-300"}
          path={"/daos/safe"}
          drafts={10}
          projects={6}
          disabled
        />
        <DaoCard
          name={"Uniswap"}
          colour={"bg-pink-600"}
          path={"/daos/uniswap"}
          drafts={10}
          projects={6}
          disabled
        />
      </div>
    </PlatformLayout>
  );
}
