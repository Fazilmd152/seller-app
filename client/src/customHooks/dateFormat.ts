class DatesFormats{

private createdAt:string

  constructor(createdAt:string){
    this.createdAt=createdAt
  }
    
     getJoinedSince() {
        const date = new Date(this.createdAt);
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `Since ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      }
      
      formatDateHyphen(): string {
        const date = new Date(this.createdAt)
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}-${month}-${year}`;
      }
      formatDateSlash(arg: string): string {
        const date = new Date(this.createdAt)
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
      }

      calculateTimeElapsed() {
        const date = new Date(this.createdAt)
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
      
        if (days > 0) {
          return `${days}d`;
        } else if (hours > 0) {
          return `${hours}h`;
        } else if (minutes > 0) {
          return `${minutes}m`;
        } else {
          return `${seconds}s`;
        }
      }
      
}

export default DatesFormats

