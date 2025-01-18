// import {
//   BackpackIcon,
//   ExclamationTriangleIcon,
//   IdCardIcon,
//   Link2Icon,
//   PersonIcon,
// } from '@radix-ui/react-icons';

// interface MetadataBarProps {
//   documentId: string;
//   isSaving: boolean;
//   handleSave: () => void;
//   handleClose: () => void;
//   link: string;
//   setLink: (link: string) => void;
//   projectName: string;
//   projects: any[];
//   project: string;
//   setProject: (project: string) => void;
// }

// export default function MetadataBar({
//   documentId,
//   link,
//   setLink,
//   projectName,
//   projects,
//   project,
//   setProject,
// }: MetadataBarProps) {
//   return (
//     <div id="half2" className="w-3/12 h-full pl-4 text-sm flex flex-col">
//       <div className="flex flex-col px-2 gap-2">
//         <div className="flex flex-col gap-1 mb-1">
//           <div className="flex gap-2 items-center">
//             <Link2Icon /> Related Discussion Link
//           </div>
//           <input
//             onChange={e => setLink(e.target.value)}
//             value={link}
//             className="py-2 px-3 w-full
//             placeholder:dark:text-stone-600
//             placeholder:text-stone-300
//             bg-white dark:bg-stone-700
//             outline-none rounded-sm"
//             placeholder="Enter an url..."
//             type="text"
//           />
//         </div>
//         <div className="flex flex-col gap-1 mb-1">
//           <div className="flex gap-2 items-center">
//             <BackpackIcon />
//             Project
//           </div>
//           <select
//             value={documentId === '0' ? projectName : project}
//             onChange={e => setProject(e.target.value)}
//             className="py-2 px-3 mr-2 w-full
//             placeholder:dark:text-stone-800
//             placeholder:text-stone-300
//             bg-white dark:bg-stone-700
//             outline-none rounded-sm">
//             {projects.map((i: any, k: number) => (
//               <option key={k} value={i.project}>
//                 {i.project}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex flex-col gap-1 mb-1">
//           <div className="flex gap-2 items-center">
//             <IdCardIcon />
//             Label
//           </div>
//           <select
//             className="py-2 px-3 mr-2
//             placeholder:dark:text-stone-800
//             placeholder:text-stone-300  w-full
//             bg-white dark:bg-stone-700
//             outline-none opacity-50  rounded-sm"></select>
//         </div>

//         <div className="flex flex-col gap-1 mb-1">
//           <div className="flex gap-2 items-center">
//             <ExclamationTriangleIcon />
//             Priority
//           </div>
//           <select
//             disabled
//             className="py-2 px-3 mr-2
//             placeholder:dark:text-stone-600  w-full
//             placeholder:text-stone-300
//             bg-white dark:bg-stone-700
//             outline-none rounded-sm  opacity-50  ">
//             <option value={'medium'}></option>
//           </select>
//         </div>

//         <div className="flex flex-col gap-1 mb-1">
//           <div className="flex gap-2 items-center">
//             <PersonIcon />
//             Collaborators
//           </div>
//           <select
//             disabled
//             className="py-2 px-3 mr-2
//             placeholder:dark:text-stone-800
//             placeholder:text-stone-300  w-full
//             bg-white dark:bg-stone-700
//             outline-none rounded-sm">
//             <option value={'critical'}> </option>
//             <option value={'high'}> </option>
//             <option defaultValue={''} value={''}></option>
//             <option value={'low'}> </option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }
import {
  BackpackIcon,
  ExclamationTriangleIcon,
  IdCardIcon,
  Link2Icon,
  PersonIcon,
} from '@radix-ui/react-icons';

interface Project {
  project: string;
}

interface MetadataBarProps {
  documentId: string;
  link: string;
  setLink: (link: string) => void;
  projectName: string;
  projects: Project[];
  project: string;
  setProject: (project: string) => void;
}

export default function MetadataBar({
  documentId,
  link,
  setLink,
  projectName,
  projects,
  project,
  setProject,
}: MetadataBarProps) {
  const inputClasses =
    'py-2 px-3 w-full bg-white dark:bg-stone-700 outline-none rounded-sm';
  const selectClasses = `${inputClasses} placeholder:text-stone-300 placeholder:dark:text-stone-600`;

  return (
    <div id="half2" className="w-3/12 h-full pl-4 text-sm flex flex-col">
      <div className="flex flex-col px-2 gap-2">
        {/* Link Input */}
        <div className="flex flex-col gap-1 mb-1">
          <div className="flex gap-2 items-center">
            <Link2Icon /> Related Discussion Link
          </div>
          <input
            onChange={e => setLink(e.target.value)}
            value={link}
            className={inputClasses}
            placeholder="Enter an url..."
            type="text"
          />
        </div>

        {/* Project Select */}
        <div className="flex flex-col gap-1 mb-1">
          <div className="flex gap-2 items-center">
            <BackpackIcon /> Project
          </div>
          <select
            value={documentId === '0' ? projectName : project}
            onChange={e => setProject(e.target.value)}
            className={selectClasses}>
            {projects.map((proj, index) => (
              <option key={index} value={proj.project}>
                {proj.project}
              </option>
            ))}
          </select>
        </div>

        {/* Label Select (Empty for now) */}
        <div className="flex flex-col gap-1 mb-1">
          <div className="flex gap-2 items-center">
            <IdCardIcon /> Label
          </div>
          <select className={`${selectClasses} opacity-50`} />
        </div>

        {/* Priority Select (Disabled) */}
        <div className="flex flex-col gap-1 mb-1">
          <div className="flex gap-2 items-center">
            <ExclamationTriangleIcon /> Priority
          </div>
          <select disabled className={`${selectClasses} opacity-50`}>
            <option value="medium">Medium</option>
          </select>
        </div>

        {/* Collaborators Select (Disabled) */}
        <div className="flex flex-col gap-1 mb-1">
          <div className="flex gap-2 items-center">
            <PersonIcon /> Collaborators
          </div>
          <select disabled className={selectClasses}>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="">None</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}
