import type { Message } from "../interface/interface";

const MessageContainer = ({ messages }: { messages: Message[] }) => {
  const typeClasses = {
    info: "text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400",
    danger: "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400",
    success: "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400",
    warning:  "text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300",
    dark: "text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-300",
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {messages.map((message) => (
        <div key={message.id} >
        {message?.title!!.length>0 && message?.message!!.length >0 ?
            <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
              <div className={`p-4 text-sm rounded-lg transition-opacity duration-700 ${typeClasses[message.type]}`}
                role="alert">    
                <span className="font-medium">{message.title}:</span> {message.message}
              </div>
            </div>
          : 
            <div></div>
        }
        </div>        
      ))}
    </div>
  );
}
export default MessageContainer