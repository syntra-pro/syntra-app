// import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
// import { Card, CardContent, CardFooter } from "./ui/Card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "./ui/DropdownMenu";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";

// import { Button } from "./ui/Button";

// export default function ActivityFeed() {
//   return (
//     <div className="w-full max-w-4xl mx-auto">
//       <Tabs defaultValue="votes" className="border-b">
//         <TabsList className="w-full flex justify-between">
//           <TabsTrigger value="votes" className="flex-1">
//             Votes
//           </TabsTrigger>
//           <TabsTrigger value="discussions" className="flex-1">
//             Discussions
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="votes" className="py-6s grid gap-4">
//           <Card className="border-0 shadow-lg w-full flex items-start gap-4">
//             <Avatar className="h-10 w-10">
//               <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
//               <AvatarFallback>AC</AvatarFallback>
//             </Avatar>
//             <div className="flex-1">
//               <CardContent className="p-0">
//                 <p>
//                   <strong>Upgrade Proposal #10: Granite Network Upgrade</strong>
//                 </p>
//               </CardContent>
//               <CardFooter className="flex items-center gap-4">
//                 <Button variant="ghost" size="icon">
//                   <HeartIcon className="h-4 w-4" />
//                   <span className="sr-only">Like</span>
//                 </Button>
//                 <Button variant="ghost" size="icon">
//                   <MessageCircleIcon className="h-4 w-4" />
//                   <span className="sr-only">Comment</span>
//                 </Button>
//                 <Button variant="ghost" size="icon">
//                   <ShareIcon className="h-4 w-4" />
//                   <span className="sr-only">Share</span>
//                 </Button>
//                 <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
//                   <HeartIcon className="h-4 w-4" />
//                   <span>12</span>
//                   <MessageCircleIcon className="h-4 w-4" />
//                   <span>4</span>
//                 </div>
//               </CardFooter>
//             </div>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon" className="rounded-full">
//                   <MoveHorizontalIcon className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem>Save</DropdownMenuItem>
//                 <DropdownMenuItem>Report</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </Card>
//           <Card className="border-0 shadow-lg w-full flex items-start gap-4">
//             <Avatar className="h-10 w-10">
//               <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
//               <AvatarFallback>JD</AvatarFallback>
//             </Avatar>
//             <div className="flex-1">
//               <CardContent className="p-0">
//                 <p>
//                   <strong>
//                     [Non-Constitutional AIP] Front-end interface to force
//                     transaction inclusion during sequencer downtime
//                   </strong>
//                 </p>
//               </CardContent>
//               <CardFooter className="flex items-center gap-4">
//                 <Button variant="ghost" size="icon">
//                   <HeartIcon className="h-4 w-4" />
//                   <span className="sr-only">Like</span>
//                 </Button>
//                 <Button variant="ghost" size="icon">
//                   <MessageCircleIcon className="h-4 w-4" />
//                   <span className="sr-only">Comment</span>
//                 </Button>
//                 <Button variant="ghost" size="icon">
//                   <ShareIcon className="h-4 w-4" />
//                   <span className="sr-only">Share</span>
//                 </Button>
//                 <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
//                   <HeartIcon className="h-4 w-4" />
//                   <span>24</span>
//                   <MessageCircleIcon className="h-4 w-4" />
//                   <span>8</span>
//                 </div>
//               </CardFooter>
//             </div>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon" className="rounded-full">
//                   <MoveHorizontalIcon className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem>Save</DropdownMenuItem>
//                 <DropdownMenuItem>Report</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </Card>
//         </TabsContent>
//         <TabsContent value="discussions" className="py-6s grid gap-4">
//           <Card className="border-0 shadow-lg w-full flex items-start gap-4">
//             <Avatar className="h-10 w-10">
//               <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
//               <AvatarFallback>AM</AvatarFallback>
//             </Avatar>
//             <div className="flex-1">
//               <CardContent className="p-0">
//                 <p>
//                   Just finished an amazing yoga session. Feeling refreshed and
//                   energized!
//                 </p>
//               </CardContent>
//               <CardFooter className="flex items-center gap-4">
//                 <Button variant="ghost" size="icon">
//                   <HeartIcon className="h-4 w-4" />
//                   <span className="sr-only">Like</span>
//                 </Button>
//                 <Button variant="ghost" size="icon">
//                   <MessageCircleIcon className="h-4 w-4" />
//                   <span className="sr-only">Comment</span>
//                 </Button>
//                 <Button variant="ghost" size="icon">
//                   <ShareIcon className="h-4 w-4" />
//                   <span className="sr-only">Share</span>
//                 </Button>
//                 <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
//                   <HeartIcon className="h-4 w-4" />
//                   <span>18</span>
//                   <MessageCircleIcon className="h-4 w-4" />
//                   <span>6</span>
//                 </div>
//               </CardFooter>
//             </div>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon" className="rounded-full">
//                   <MoveHorizontalIcon className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem>Save</DropdownMenuItem>
//                 <DropdownMenuItem>Report</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </Card>
//           <Card className="border-0 shadow-lg w-full flex items-start gap-4">
//             <Avatar className="h-10 w-10">
//               <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
//               <AvatarFallback>JD</AvatarFallback>
//             </Avatar>
//             <div className="flex-1">
//               <CardContent className="p-0">
//                 <p>
//                   Spent the weekend hiking in the mountains. It was so peaceful
//                   and refreshing to get away from the city for a bit.
//                 </p>
//               </CardContent>
//               <CardFooter className="flex items-center gap-4">
//                 <Button variant="ghost" size="icon">
//                   <HeartIcon className="h-4 w-4" />
//                   <span className="sr-only">Like</span>
//                 </Button>
//                 <Button variant="ghost" size="icon">
//                   <MessageCircleIcon className="h-4 w-4" />
//                   <span className="sr-only">Comment</span>
//                 </Button>
//                 <Button variant="ghost" size="icon">
//                   <ShareIcon className="h-4 w-4" />
//                   <span className="sr-only">Share</span>
//                 </Button>
//                 <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
//                   <HeartIcon className="h-4 w-4" />
//                   <span>24</span>
//                   <MessageCircleIcon className="h-4 w-4" />
//                   <span>8</span>
//                 </div>
//               </CardFooter>
//             </div>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon" className="rounded-full">
//                   <MoveHorizontalIcon className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem>Save</DropdownMenuItem>
//                 <DropdownMenuItem>Report</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Card, CardContent, CardFooter } from "./ui/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";

import { Button } from "./ui/Button";
import { MoreHorizontalIcon } from "lucide-react";
import React from "react";

// import {
//   HeartIcon,
//   MessageCircleIcon,
//   ShareIcon,
//   MoreHorizontalIcon,
// } from "lucide-react";

export default function ActivityFeed() {
  return (
    <div className="w-full max-w-4xl mx-auto ">
      <Tabs defaultValue="votes" className="space-y-4">
        <TabsList className="w-full grid bg-stone-200 grid-cols-2 gap-4">
          <TabsTrigger value="votes" className="w-full">
            Votes
          </TabsTrigger>
          <TabsTrigger value="discussions" className="w-full">
            Discussions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="votes" className="space-y-4">
          <FeedItem
            avatar="AC"
            title="Upgrade Proposal #10: Granite Network Upgrade"
            likes={12}
            comments={4}
          />
          <FeedItem
            avatar="JD"
            title="[Non-Constitutional AIP] Front-end interface to force transaction inclusion during sequencer downtime"
            likes={24}
            comments={8}
          />
          <FeedItem
            avatar="XD"
            title="[Non-Constitutional AIP] Front-end interface to force transaction inclusion during sequencer downtime"
            likes={24}
            comments={8}
          />
        </TabsContent>

        <TabsContent value="discussions" className="space-y-4">
          <FeedItem
            avatar="AM"
            title="Just finished an amazing yoga session. Feeling refreshed and energized!"
            likes={18}
            comments={6}
          />
          <FeedItem
            avatar="JD"
            title="Spent the weekend hiking in the mountains. It was so peaceful and refreshing to get away from the city for a bit."
            likes={24}
            comments={8}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function FeedItem({ avatar, title, likes, comments }: any) {
  return (
    <Card className="w-full shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-user.jpg" alt={avatar} />
            <AvatarFallback>{avatar}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="font-medium">{title}</p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="px-0">
                <HeartIcon className="h-4 w-4 mr-1" />
                <span>{likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="px-0">
                <MessageCircleIcon className="h-4 w-4 mr-1" />
                <span>{comments}</span>
              </Button>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="sm">
            <ShareIcon className="h-4 w-4 mr-2" />
          </Button>
        </div>
      </CardContent>
      {/* <CardFooter className="px-4 py-3 border-t flex justify-between">
        <Button variant="ghost" size="sm">
          <HeartIcon className="h-4 w-4 mr-2" />
          Like
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircleIcon className="h-4 w-4 mr-2" />
          Comment
        </Button>
        <Button variant="ghost" size="sm">
          <ShareIcon className="h-4 w-4 mr-2" />
          Share
        </Button>
      </CardFooter> */}
    </Card>
  );
}

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function MessageCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function MoveHorizontalIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function ShareIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}
