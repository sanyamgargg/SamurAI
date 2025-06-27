-- Enable uuid-ossp extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), 
    email VARCHAR(255) UNIQUE NOT NULL,    
    full_name VARCHAR(255),                               
    customer_id VARCHAR(255) UNIQUE,                      
    status VARCHAR(50) DEFAULT 'inactive' , 
    price_id VARCHAR(255),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the user record was created
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP  -- Timestamp for last update
);





-- Table: pdf_summaries

-- Stores metadata and summary text for uploaded PDFs.
CREATE TABLE pdf_summaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL ,    
    original_file_url TEXT NOT NULL, 
    summary_text TEXT NOT NULL, 
    title TEXT,  
    file_name TEXT,
    status VARCHAR(20) DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP  
);



-- Table: payments
-- Records payment transactions made by users.
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), 
    amount INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL,
    stripe_payment_id  VARCHAR(255) UNIQUE NOT NULL,            
    price_id VARCHAR(255) NOT NULL,                                 
    user_email VARCHAR(255) NOT NULL REFERENCES users(email), -- Email used for the payment (redundant but often useful for reconciliation)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP  
);




-- Trigger function to update the 'updated_at' column automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to the 'users' table
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Apply the trigger to the 'pdf_summaries' table
CREATE TRIGGER update_pdf_summaries_updated_at
BEFORE UPDATE ON pdf_summaries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Apply the trigger to the 'payments' table
CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE ON payments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();