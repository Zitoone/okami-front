// Définition des types Artist basée sur le schéma MongoDB du backend
export interface Artist {
    _id?: string;
    projectName: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    guestName?: string;
    setup?: string;
    setupTime?: string;
    needsSoundcheck?: string;
    canRecordSet?: boolean;
    comments?: string;
    riderTechUrl?: string;
    riderTechUpload?: string;
    promoPhoto?: string;
    socialLinks?: {
        instagram?: string;
        soundcloud?: string;
        spotify?: string;
        facebook?: string;
        website?: string;
        youtube?: string;
    };
    musicalStyle?: string;
/*     promoText?: string; */
    numberOfPeople?: number;
    stage?: string;
    performanceDateTime?: string;
    soundcheckDateTime?: string;
    arrivalRun?: string;
    departureRun?: string;
    accommodation?: string;
    contract?: string;
    invoice?: string;
    roadmap?: string;
    sacemForm?: string;
    specialInfo?: string;
    fee?: number;
    travelExpenses?: number;
    totalTTC?: string;
    paymentInfo?: string;
    dataSource?: 'artist' | 'admin';
    lastModifiedBy?: 'artist' | 'admin';
    isValidated?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
