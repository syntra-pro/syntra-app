// "use client";

// import { AlertTriangle, HelpCircle, MessageSquare } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "./ui/Card";
// import React, { useState } from "react";

// import { Button } from "./ui/Button";

// type CommentType = "Problem" | "Question" | "Feedback";

// interface CommentTypeConfig {
//   icon: React.ReactNode;
//   description: string;
//   placeholder: string;
//   buttonColor: string;
// }

// const commentTypeConfigs: Record<CommentType, CommentTypeConfig> = {
//   Problem: {
//     icon: <AlertTriangle className="h-4 w-4" />,
//     description:
//       "What is the issue? If you are reporting a bug, what are the steps you took so we can reproduce the behaviour?",
//     placeholder: "Something seems wrong...",
//     buttonColor: "bg-red-500 hover:bg-red-600",
//   },
//   Question: {
//     icon: <HelpCircle className="h-4 w-4" />,
//     description:
//       "How can we help? Please share any relevant information we may need to answer your question.",
//     placeholder: "How do I...",
//     buttonColor: "bg-blue-500 hover:bg-blue-600",
//   },
//   Feedback: {
//     icon: <MessageSquare className="h-4 w-4" />,
//     description:
//       "How can we improve Syntra? If you have a feature request, can you also share how you would use it and why it is important to you?",
//     placeholder: "What if...",
//     buttonColor: "bg-green-500 hover:bg-green-600",
//   },
// };

// export default function FeedbackPopup({
//   onClose,
// }: {
//   onClose: () => void;
// }): React.ReactElement {
//   const [selectedType, setSelectedType] = useState<CommentType>("Feedback");
//   const [comment, setComment] = useState<string>("");

//   const handleSubmit = (): void => {
//     console.log(`Submitted ${selectedType}:`, comment);
//     setComment("");
//     onClose(); // Cerrar el modal después de enviar el comentario
//   };

//   const handleCommentChange = (
//     e: React.ChangeEvent<HTMLTextAreaElement>
//   ): void => {
//     setComment(e.target.value);
//   };

//   const handleOverlayClick = (
//     e: React.MouseEvent<HTMLDivElement, MouseEvent>
//   ): void => {
//     if (e.target === e.currentTarget) {
//       onClose(); // Cerrar el modal si se hace clic en la superposición
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//       onClick={handleOverlayClick}
//     >
//       <Card className="w-full max-w-lg mx-auto relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//         >
//           X
//         </button>
//         <CardHeader>
//           <CardTitle>Leave a Comment</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex space-x-2">
//             {(Object.keys(commentTypeConfigs) as CommentType[]).map((type) => (
//               <Button
//                 key={type}
//                 variant={selectedType === type ? "default" : "outline"}
//                 className={
//                   selectedType === type
//                     ? commentTypeConfigs[type].buttonColor
//                     : ""
//                 }
//                 onClick={() => setSelectedType(type)}
//               >
//                 {commentTypeConfigs[type].icon}
//                 <span className="ml-2">{type}</span>
//               </Button>
//             ))}
//           </div>
//           <p className="text-sm text-gray-600">
//             {commentTypeConfigs[selectedType].description}
//           </p>
//           <textarea
//             placeholder={commentTypeConfigs[selectedType].placeholder}
//             value={comment}
//             onChange={handleCommentChange}
//             rows={5}
//             className="w-full p-2 border rounded"
//           />
//         </CardContent>
//         <CardFooter>
//           <Button onClick={handleSubmit} disabled={!comment.trim()}>
//             Submit {selectedType}
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

"use client";

import { AlertTriangle, HelpCircle, MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import React, { useState } from "react";

import { Button } from "./ui/Button";
import { motion } from "framer-motion"; // Importa framer-motion

type CommentType = "Problem" | "Question" | "Feedback";

interface CommentTypeConfig {
  icon: React.ReactNode;
  description: string;
  placeholder: string;
  buttonColor: string;
}

const commentTypeConfigs: Record<CommentType, CommentTypeConfig> = {
  Problem: {
    icon: <AlertTriangle className="h-4 w-4" />,
    description:
      "What is the issue? If you are reporting a bug, what are the steps you took so we can reproduce the behaviour?",
    placeholder: "Something seems wrong...",
    buttonColor: "bg-red-500 hover:bg-red-600",
  },
  Question: {
    icon: <HelpCircle className="h-4 w-4" />,
    description:
      "How can we help? Please share any relevant information we may need to answer your question.",
    placeholder: "How do I...",
    buttonColor: "bg-blue-500 hover:bg-blue-600",
  },
  Feedback: {
    icon: <MessageSquare className="h-4 w-4" />,
    description:
      "How can we improve Syntra? If you have a feature request, can you also share how you would use it and why it is important to you?",
    placeholder: "What if...",
    buttonColor: "bg-green-500 hover:bg-green-600",
  },
};

export default function FeedbackPopup({
  onClose,
}: {
  onClose: () => void;
}): React.ReactElement {
  const [selectedType, setSelectedType] = useState<CommentType>("Feedback");
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (): void => {
    console.log(`Submitted ${selectedType}:`, comment);
    setComment("");
    onClose(); // Cerrar el modal después de enviar el comentario
  };

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setComment(e.target.value);
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (e.target === e.currentTarget) {
      onClose(); // Cerrar el modal si se hace clic en la superposición
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <motion.div
        className="w-full max-w-lg mx-auto relative"
        initial={{ y: "100%", opacity: 0 }} // Estado inicial: fuera de la pantalla hacia abajo
        animate={{ y: 0, opacity: 1 }} // Animación hacia la posición final
        exit={{ y: "100%", opacity: 0 }} // Animación de salida: se desliza hacia abajo
        transition={{ duration: 0.3 }} // Duración de la animación
      >
        <Card>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            X
          </button>
          <CardHeader>
            <CardTitle>Leave a Comment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              {(Object.keys(commentTypeConfigs) as CommentType[]).map(
                (type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    className={
                      selectedType === type
                        ? commentTypeConfigs[type].buttonColor
                        : ""
                    }
                    onClick={() => setSelectedType(type)}
                  >
                    {commentTypeConfigs[type].icon}
                    <span className="ml-2">{type}</span>
                  </Button>
                )
              )}
            </div>
            <p className="text-sm text-gray-600">
              {commentTypeConfigs[selectedType].description}
            </p>
            <textarea
              placeholder={commentTypeConfigs[selectedType].placeholder}
              value={comment}
              onChange={handleCommentChange}
              rows={5}
              className="w-full p-2 border rounded"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} disabled={!comment.trim()}>
              Submit {selectedType}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
