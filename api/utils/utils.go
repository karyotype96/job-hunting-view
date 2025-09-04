package utils

type ApplicationStatus int

const (
	Applied ApplicationStatus = iota
	Rejected
	Accepted
)
