'use client';

import { ALL_DOCS_FOLDER } from '../../../../lib/constants';
import CollaborativeEditor from '../../../components/CollaborativeEditor';
import PlatformLayout from '../../../layouts/platformLayout';
import { doc } from 'firebase/firestore';
import { useAuth } from '../../../components/contexts/AuthContext';

export default function DraftPage({
  params,
}: {
  params: { id: string; docId: string; selectedProject: string };
}) {
  const { authenticated, user, ready } = useAuth();
  const { id: idDao, docId, selectedProject } = params;

  console.log('params ', params);
  // TODO: OPEN IF YOU HAVE RIGHTS
  // TODO: SET LOADED METADATA
  return (
    <PlatformLayout>
      <div className="flex flex-col flex-grow overflow-auto w-full">
        <div
          className=" px-4
        bg-stone-100 dark:bg-stone-800 dark:text-stone-400
        shadow-lg w-full  
        transition-opacity duration-300 ease-in-out flex flex-col flex-grow overflow-auto
        opacity-100">
          {user?.wallet?.address && idDao && (
            <CollaborativeEditor
              proposalURL={''}
              backToProposals={false}
              daoTemplate={undefined} // no no
              folder={`${idDao}/${user?.wallet?.address}`}
              documentId={docId}
              afterSave={() => console.log('saved')} // no no
              afterSave2={() => true} // no no
              projectName={selectedProject} // from props
              projects={
                []

                //   projects.filter(
                //   // all projects
                //   (r: any) => r.project !== ALL_DOCS_FOLDER,
                // )
              }
            />
          )}
        </div>
      </div>
    </PlatformLayout>
  );
}
