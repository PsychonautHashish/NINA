export const computeMetrics = (appointments, queue) => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
  
    return {
      todayAppointments: appointments.filter(
        app => new Date(app.date).toISOString().split('T')[0] === todayString
      ).length,
  
      currentQueue: queue.filter(item => item.status === 'waiting').length,
  
      monthlyConsultations: queue.filter(item => {
        if (item.status !== 'completed') return false;
        const completedDate = new Date(item.lastUpdated);
        return completedDate.getMonth() === today.getMonth() &&
               completedDate.getFullYear() === today.getFullYear();
      }).length
    };
  };
  