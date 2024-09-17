'use client';

import { AlertTriangle, HelpCircle, MessageSquare } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/Card';
import React, { useState } from 'react';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

import { Button } from './ui/Button';
import { motion } from 'framer-motion'; // Importa framer-motion
import { useAuth } from './contexts/AuthContext';
import { usePrivy } from '@privy-io/react-auth';

type CommentType = 'Problem' | 'Question' | 'Feedback';

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
      'What is the issue? If you are reporting a bug, what are the steps you took so we can reproduce the behaviour?',
    placeholder: 'Something seems wrong...',
    buttonColor:
      'bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 ',
  },
  Question: {
    icon: <HelpCircle className="h-4 w-4" />,
    description:
      'How can we help? Please share any relevant information we may need to answer your question.',
    placeholder: 'How do I...',
    buttonColor:
      'bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600',
  },
  Feedback: {
    icon: <MessageSquare className="h-4 w-4" />,
    description:
      'How can we improve Syntra? If you have a feature request, can you also share how you would use it and why it is important to you?',
    placeholder: 'What if...',
    buttonColor:
      'bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600',
  },
};

export default function FeedbackPopup({
  onClose,
}: {
  onClose: () => void;
}): React.ReactElement {
  const [selectedType, setSelectedType] = useState<CommentType>('Feedback');
  const [sending, setSending] = useState<boolean>(false);
  const [textSend, setTextSend] = useState('');
  const [comment, setComment] = useState<string>('');
  const { user } = usePrivy();
  const { firebaseUser } = useAuth();
  const auth = getAuth();

  const handleSubmit = async () => {
    setSending(true);
    setTextSend('Sending...');
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.log('user not logged');
        return;
      }

      const token = await currentUser.getIdToken();
      const timestamp = new Date().toISOString();

      const data = {
        token, //: firebaseUser.customToken,
        type: selectedType,
        contents: comment,
        timestamp,
        user: user?.wallet?.address,
      };
      // console.log('data ', data);
      // return;
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${firebaseUser.idToken}`,
        },
        body: JSON.stringify(data),
      });

      // await signInWithCustomToken(auth, firebaseUser.customToken);
      // const idToken = await auth.currentUser?.getIdToken();

      // console.log(`Submitted ${selectedType}:`, comment);
      // if (idToken) {

      if (response.ok) {
        setTextSend('Thanks for your feedback!');
      } else {
        const responseData = await response.json();
        console.log(responseData.message);
        setTextSend('Error sending 💥💥');
      }
    } catch (err) {
      console.log(err);
      setTextSend('Error sending 💥');
    }
    // } else {
    //   console.log('no token');
    // }

    setComment('');
    setSending(false);
    onClose();
  };

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setComment(e.target.value);
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}>
      <motion.div
        className="w-full max-w-lg mx-auto relative"
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.3 }}>
        <Card className="dark:bg-stone-600 border-transparent shadow-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
            ✕
          </button>
          <CardHeader>
            <CardTitle className="dark:text-stone-300">
              Leave a Comment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex text-stone-500 space-x-2">
              {(Object.keys(commentTypeConfigs) as CommentType[]).map(type => (
                <Button
                  key={type}
                  variant={selectedType === type ? 'default' : 'outline'}
                  className={
                    selectedType === type
                      ? commentTypeConfigs[type].buttonColor
                      : ''
                  }
                  onClick={() => setSelectedType(type)}>
                  {commentTypeConfigs[type].icon}
                  <span className="ml-2">{type}</span>
                </Button>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-stone-300">
              {commentTypeConfigs[selectedType].description}
            </p>
            <textarea
              placeholder={commentTypeConfigs[selectedType].placeholder}
              value={comment}
              onChange={handleCommentChange}
              rows={5}
              className="w-full p-2   rounded-lg outline-none dark:text-stone-300 bg-stone-100 dark:bg-stone-700"
            />
          </CardContent>
          <CardFooter>
            {sending ? (
              <button className="bg-transparent">{textSend}</button>
            ) : (
              <button
                className="bg-rose-300 px-3 py-2 rounded-md"
                onClick={handleSubmit}
                disabled={!comment.trim()}>
                Submit {selectedType}
              </button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
